<?php

class Truck extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
	
	);
	public function dmethod()
	{
		return $this->belongsTo('Dmethod');
	}

	public function orders()
	{
		return $this->hasMany('Order');
	}

}
