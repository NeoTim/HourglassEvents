<?php

class Entry extends Eloquent {
	protected $guarded = array();

	protected $softDelete = true;

	public static $rules = array(
		'order_id' => 'required',
	);


	public function order()
	{
		return $this->belongsTo('Order');
	}

	public function pmethod()
	{
		return $this->belongsTo('Pmethod');
	}
	public function category()
	{
		return $this->belongsTo('Category');
		
	}
	public function product()
	{
		return $this->belongsTo('Product');
		
	}

}