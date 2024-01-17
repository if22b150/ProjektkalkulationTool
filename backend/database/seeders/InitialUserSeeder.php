<?php

namespace Database\Seeders;

use App\Enums\ERole;
use App\Models\Expense;
use App\Models\Faculty;
use App\Models\Lecturer;
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
            'email' => 'admin@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::ADMIN,
            'password_reset' => true
        ]);
        $admin->markEmailAsVerified();
        $admin->save();

        $faculty1 = new Faculty([
           'name' => "Fakultät 1"
        ]);
        $faculty1->save();

        $faculty2 = new Faculty([
            'name' => "Fakultät 2"
        ]);
        $faculty2->save();

        $faculty1User = new User([
            'email' => 'faculty1@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::FACULTY,
            'password_reset' => true,
            'faculty_id' => 1
        ]);
        $faculty1User->markEmailAsVerified();
        $faculty1User->save();

        $faculty2User = new User([
            'email' => 'faculty2@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::FACULTY,
            'password_reset' => false,
            'faculty_id' => 2
        ]);
        $faculty2User->markEmailAsVerified();
        $faculty2User->save();

        $lecturer1 = new Lecturer([
            'name' => 'Fak Ltg.',
            'hourly_rate' => 55,
            'daily_rate' => 440,
            'faculty_id' => 1
        ]);
        $lecturer1->save();

        $lecturer2 = new Lecturer([
            'name' => 'Dep Ltg.',
            'hourly_rate' => 50,
            'daily_rate' => 400,
            'faculty_id' => 1
        ]);
        $lecturer2->save();

        $lecturer3 = new Lecturer([
            'name' => 'KF Ltg.',
            'hourly_rate' => 45,
            'daily_rate' => 360,
            'faculty_id' => 2
        ]);
        $lecturer3->save();

        $expense1 = new Expense([
            'name' => 'Reiseaufwand',
            'price' => 250
        ]);
        $expense1->save();

        $expense2 = new Expense([
            'name' => 'Bewirtung',
            'price' => 100
        ]);
        $expense2->save();

        $expense3 = new Expense([
            'name' => 'Marketing und Werbung',
            'price' => 500
        ]);
        $expense3->save();
    }
}
