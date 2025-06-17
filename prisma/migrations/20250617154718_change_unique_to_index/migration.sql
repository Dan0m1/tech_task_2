-- CreateIndex
CREATE INDEX "unique_booking_active" ON "Booking"("user_id", "room_id", "start_time", "end_time")
WHERE "deleted_at" IS NULL;

