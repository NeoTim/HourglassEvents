<?php

class StoreOrdersEventHandler {
 
    CONST EVENT = 'orders.store';
    CONST CHANNEL = 'orders.store';
 
    public function handle($data)
    {
        $redis = Redis::connection();
        $redis->publish(self::CHANNEL, $data);
    }
}
