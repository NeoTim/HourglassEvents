<?php

class Product extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'sku' => 'required'
		

	);
	public function category()
	{
		return $this->belongsToMany('Category');
	}
	public function entries()
	{
		return $this->hasMany('Entry');
	}
}
