<?php

class StoreEntriesEventHandler {
 
    CONST EVENT = 'entries.store';
    CONST CHANNEL = 'entries.store';
 
    public function handle($data)
    {
        $redis = Redis::connection();
        $redis->publish(self::CHANNEL, $data);
    }
}
