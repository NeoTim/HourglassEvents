<?php

class Notification extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'title' => 'required',
		'body'	=> 'required'
		);
}
