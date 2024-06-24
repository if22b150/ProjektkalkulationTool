<?php

namespace App\Repositories;

use App\Models\Notification;
use App\Repositories\Interfaces\INotificationRepository;
use Illuminate\Database\Eloquent\Collection;

class NotificationRepository implements INotificationRepository
{
    public function getOne(int $id): ?Notification
    {
        return Notification::findOrFail($id);
    }

    public function getAll(): Collection
    {
        return Notification::all();
    }

    public function save(Notification $notification): ?Notification
    {
        return $notification->save() ? $notification : null;
    }

    public function update(int $id,
                           string $email,
                           bool $activated): ?Notification
    {
        $updated = Notification::where('id', $id)
            ->update([
                'email' => $email,
                'activated' => $activated
            ]);

        return $updated ? $this->getOne($id) : null;
    }
}
