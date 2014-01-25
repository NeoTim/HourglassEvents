<?php

class Ptype extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required'
	);

	public function pmethods()
	{
		return $this->hasMany('Pmethod');
	}
	public function category()
	{
		return $this->belongsTo('Category');
	}

}
