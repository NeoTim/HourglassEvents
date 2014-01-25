<?php

class Dtype extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required'
	);

	public function dmethods()
	{
		return $this->hasMany('dmethods');
	}

	public function orders()
	{
		return $this->hasMany('Order');
	}	
	public function category()
	{
		return $this->belongsTo('Category');
	}
}
