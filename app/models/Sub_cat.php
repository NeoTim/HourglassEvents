<?php

class Sub_cat extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required',
		'category_id' => 'required',
		'position' => 'required',
		'visible' => 'required'
	);
	public function category()
	{
		return $this->belongsTo('Category');
	}
}
