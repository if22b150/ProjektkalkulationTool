<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    private ?string $password;

    public function __construct($resource, ?string $password = null)
    {
        parent::__construct($resource);
        $this->password = $password;
    }

    public function toArray($request)
    {
        $r = [
            'id' => $this->id,
            'email' => $this->email,
            'role' => $this->role,
            'verified' => $this->email_verified_at != null,
            'passwordReset' => $this->password_reset,
            'faculty' => $this->faculty ? new FacultyResource($this->faculty) : null
        ];

        if($this->password)
            $r['password'] = $this->password;

        return $r;
    }
}
