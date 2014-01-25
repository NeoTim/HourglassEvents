<?php

class DeleteEntriesEventHandler {
 
    CONST EVENT = 'entries.delete';
    CONST CHANNEL = 'entries.delete';
 
    public function handle($data)
    {
        $redis = Redis::connection();
        $redis->publish(self::CHANNEL, $data);
    }
}
