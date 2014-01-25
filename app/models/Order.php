<?php

class Order extends Eloquent {
	protected $guarded = array();

	protected $softDelete = true;


	public static $rules = array(
		'number' => 'required',
	);
	public function truck()
	{
		return $this->belongsTo('Truck');
	}
	public function entries()
	{
		return $this->hasMany('Entry');
	}
	public function dmethod()
	{
		return $this->belongsTo('Dmethod');
	}

	public function dtype()
	{
		return $this->belongsTo('Dtype');
	}

	public function customer()
	{
		return $this->belongsTo('Customer');
	}
	public function category()
	{
		return $this->belongsTo('Category');
	}
	protected static function boot() {
        parent::boot();

        static::deleting(function($order) { // before delete() method call this
            $order->entries()->delete();
            
             // do the rest of the cleanup...
        });
    }


    
}
