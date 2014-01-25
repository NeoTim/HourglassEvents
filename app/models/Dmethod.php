<?php

class Dmethod extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required',
	
	);

	public function orders()
	{
		return $this->hasMany('Order');
	}

	public function dtype()
	{
		return $this->belongsTo('Dtype');
	}
	public function category()
	{
		return $this->belongsTo('Category');
	}

	public function trucks()
	{
		return $this->hasMany('Truck');
	}



}
