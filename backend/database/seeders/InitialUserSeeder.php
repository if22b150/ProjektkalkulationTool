<?php

namespace Database\Seeders;

use App\Enums\ERole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitialUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User([
            'email' => 'if22b150@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::ADMIN
        ]);
        $admin->markEmailAsVerified();
        $admin->save();
    }
}
