<?php

class UpdateEntriesEventHandler {
 
    CONST EVENT = 'entries.update';
    CONST CHANNEL = 'entries.update';
 
    public function handle($data)
    {
        $redis = Redis::connection();
        $redis->publish(self::CHANNEL, $data);
    }
}