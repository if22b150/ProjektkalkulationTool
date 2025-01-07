<?php

namespace App\Repositories;

use App\Enums\ERole;
use App\Models\PasswordReset;
use App\Models\User;
use App\Repositories\Interfaces\IUserRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class UserRepository implements IUserRepository
{
    public function __construct()
    {
    }

    public function getOne(int $id): ?User
    {
        return $this->exists($id) ? User::find($id) : null;
    }

    public function getAll(?string $role = null): Collection
    {
        if (!$role)
            return User::all();

        return User::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if ($related)
            return User::where($column, $value)->where([$related])->get();
        return User::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return User::destroy($id) == 1;
    }

    public function getByEmail(string $email): ?User
    {
        return User::firstWhere('email', $email);
    }

    public function exists(int $id): bool
    {
        return User::where('id', $id)->exists();
    }

    public function save(User $user): ?User
    {
        return $user->save() ? $user : null;
    }

//    public function update(int    $user_id,
//                           string $email,
//                           string $language): ?User
//    {
//        /** @var User */
//        $user = $this->getOne($user_id);
//
//        $user->email = $email;
//        $user->language = $language;
//
//        return $this->save($user);
//    }

    public function create(string $email,
                           ERole  $role,
                           string $password,
                           ?int   $faculty_id): ?User
    {
        $user = new User([
            'email' => $email,
            'password' => $password,
            'role' => $role,
            'faculty_id' => $faculty_id,
        ]);
        $user->markEmailAsVerified();
        return $this->save($user);
    }

    public function setPasswordReset(int $id, bool $passwordReset): ?User
    {
        $user = $this->getOne($id);
        $user->password_reset = $passwordReset;

        return $this->save($user);
    }

    public function setPassword(int $id, string $password)
    {
        /** @var User $user */
        $user = $this->getOne($id);
        $user->password = $password;
        $user->password_reset = true;

        return $this->save($user);
    }

    public function reset_password(User $user): User
    {
        $token = str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);

        $passwordReset = new \App\Models\PasswordReset([
            'email' => $user->email,
            'token' => $token,
            'created_at' => now()
        ]);
        $passwordReset->save();

        Mail::to($user->email)->send(new \App\Mail\PasswordResetMail($token));
        return $user;
    }

    public function verifyToken(string $email, string $token): void {
        $passwordReset = PasswordReset::where('email', $email)
            ->where('token', $token)
            ->first();

        if (!$passwordReset) {
            throw new \Exception("Ungültiger Code", 400);
        }

        $tokenExpiration = Carbon::parse($passwordReset->created_at)->addMinutes(60);
        if (now()->gt($tokenExpiration)) {
            throw new \Exception("Dieser Token ist abgelaufen, fordern Sie einen neuen an", 400);
        }

        PasswordReset::where('email', $email)
            ->where('token', $token)
            ->delete();
    }
}
