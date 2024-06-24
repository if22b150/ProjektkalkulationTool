<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\UpdateNotificationRequest;
use App\Http\Resources\NotificationResource;
use App\Repositories\Interfaces\INotificationRepository;

class NotificationController extends Controller
{
    public function __construct(protected INotificationRepository $notificationRepository)
    {}

    public function index()
    {
        return NotificationResource::collection($this->notificationRepository->getAll());
    }

    public function update(UpdateNotificationRequest $request, int $id)
    {
        return new NotificationResource($this->notificationRepository->update($id, $request->email, $request->activated));
    }
}

