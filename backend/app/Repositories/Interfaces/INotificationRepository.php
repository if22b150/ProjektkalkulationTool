<?php

namespace App\Repositories\Interfaces;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Collection;

interface INotificationRepository
{
    public function getOne(int $id): ?Notification;

    public function getAll(): Collection;

    public function save(Notification $notification): ?Notification;

    public function update(int $id,
                           string $email,
                           bool $activated): ?Notification;
}
