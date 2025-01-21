<?php

namespace App\Enums;

enum EProjectState: string
{
    case APPROVED = 'approved';
    case SUBMITTED = 'submitted';
    case REJECTED = 'rejected';

    /**
     * Get all values as an array.
     *
     * @return array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
