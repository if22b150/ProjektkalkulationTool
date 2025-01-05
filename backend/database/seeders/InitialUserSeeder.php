<?php

namespace Database\Seeders;

use App\Enums\ERole;
use App\Models\Company;
use App\Models\Expense;
use App\Models\Faculty;
use App\Models\Lecturer;
use App\Models\ProjectType;
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
           'name' => "Fakultät 1",
            'price_for_course_per_day' => 15000
        ]);
        $faculty1->save();

        $faculty2 = new Faculty([
            'name' => "Fakultät 2",
            'price_for_course_per_day' => 20000
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
            'hourly_rate' => 5500,
            'daily_rate' => 44000,
            'faculty_id' => 1
        ]);
        $lecturer1->save();

        $lecturer2 = new Lecturer([
            'name' => 'Dep Ltg.',
            'hourly_rate' => 5000,
            'daily_rate' => 40000,
            'faculty_id' => 1
        ]);
        $lecturer2->save();

        $lecturer3 = new Lecturer([
            'name' => 'KF Ltg.',
            'hourly_rate' => 4500,
            'daily_rate' => 36000,
            'faculty_id' => 2
        ]);
        $lecturer3->save();

        $expense1 = new Expense([
            'name' => 'Reiseaufwand'
        ]);
        $expense1->save();

        $expense2 = new Expense([
            'name' => 'Bewirtung'
        ]);
        $expense2->save();

        $expense3 = new Expense([
            'name' => 'Marketing und Werbung'
        ]);
        $expense3->save();

        $projectType1 = new ProjectType([
            'name' => 'Lehrgänge',
            'code' => 'LG',
            'is_course' => true
        ]);
        $projectType1->save();

        $projectType2 = new ProjectType([
            'name' => 'Internes Projekt',
            'code' => 'IP',
            'is_course' => false
        ]);
        $projectType2->save();

        $projectType3 = new ProjectType([
            'name' => 'Förderprojekte',
            'code' => 'FP',
            'is_course' => false
        ]);
        $projectType3->save();

        $projectType3 = new ProjectType([
            'name' => 'Seminare',
            'code' => 'SE',
            'is_course' => true
        ]);
        $projectType3->save();

        $company1 = new Company([
            'name' => 'FH-Technikum',
            'image_path' => 'company_images/FH-Technikum.png'
        ]);
        $company1->save();

        $company2 = new Company([
            'name' => 'IBM',
            'image_path' => 'company_images/ibm.jpg'
        ]);
        $company2->save();

        $company3 = new Company([
            'name' => 'Stadt Wien',
            'image_path' => 'company_images/stadt-wien.svg'
        ]);
        $company3->save();

        $company4 = new Company([
            'name' => 'Fabasoft',
            'image_path' => 'company_images/Fabasoft.jpg'
        ]);
        $company4->save();

        $company5 = new Company([
            'name' => 'Accenture',
            'image_path' => 'company_images/accenture.jpg'
        ]);
        $company5->save();

        $company6 = new Company([
            'name' => 'SAP',
            'image_path' => 'company_images/sap.png'
        ]);
        $company6->save();

        $company7 = new Company([
            'name' => 'Erste Bank',
            'image_path' => 'company_images/erst-bank.png'
        ]);
        $company7->save();

        $company8 = new Company([
            'name' => 'Paysafe',
            'image_path' => 'company_images/paysafe-card.svg'
        ]);
        $company8->save();

        $company9 = new Company([
            'name' => 'Asfinag',
            'image_path' => 'company_images/asfinag.png'
        ]);
        $company9->save();
    }
}
