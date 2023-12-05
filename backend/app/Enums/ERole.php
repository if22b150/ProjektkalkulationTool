<?php

namespace App\Enums;

enum ERole: string
{
    case ADMIN = 'admin';
    case FACULTY = 'faculty';
    case CUSTOMER = 'customer';
}
