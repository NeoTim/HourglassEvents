<?php

class Customer extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'company' => 'required'

	);

	public function orders()
	{
		return $this->hasMany('Order');
	}

	public function contacts()
	{
		return $this->hasMany('Contact');
	}

	public function category()
	{
		return $this->belongsTo('Category');
	}
	public function entries()
	{
		return $this->hasManyThrough('Entry', 'Order', 'customer_id', 'order_id');
	}
}
