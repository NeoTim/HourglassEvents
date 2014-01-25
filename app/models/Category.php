<?php

class Category extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required',
		'position' => 'required',
		'visible' => 'required'
	);

	public function sub_cats()
	{
		return $this->hasMany('Sub_cat');
	}
	public function customers()
	{
		return $this->hasMany('Customer');
	}
	public function documents()
	{
		return $this->hasMany('Document');
	}
	public function dmethods()
	{
		return $this->hasMany('Dmethod');
	}
	public function dtypes()
	{
		return $this->hasMany('Dtypes');
	}
	public function pmethods()
	{
		return $this->hasMany('Pmethod');
	}
	public function ptypes()
	{
		return $this->hasMany('Ptype');
	}
	public function products()
	{
		return $this->hasMany('Product');
	}
	public function orders()
	{
		return $this->hasMany('Order');
	}
	


}
