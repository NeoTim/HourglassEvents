<?php

class DeleteOrdersEventHandler {
 
    CONST EVENT = 'orders.delete';
    CONST CHANNEL = 'orders.delete';
 
    public function handle($data)
    {
        $redis = Redis::connection();
        $redis->publish(self::CHANNEL, $data);
    }
}