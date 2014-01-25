<?php

class Contact extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
				
	);

	public function category()
	{
		return $this->belongsTo('Category');
	}

	public function customer()
	{
		return $this->belongsTo('Customer');
	}
}
