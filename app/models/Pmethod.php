<?php

class Pmethod extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required'
	);


	public function ptype()
	{
		return $this->belongsTo('Ptype');
	}
	public function entry()
	{
		return $this->hasMany('Entry');
	}
	public function category()
	{
		return $this->belongsTo('Category');
	}
	public function entries()
	{
		return $this->hasMany('Entry');
	}
}
