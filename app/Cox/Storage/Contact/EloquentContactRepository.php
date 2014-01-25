<?php

namespace Cox\Storage\Contact;

use Contact;

class EloquentContactRepository implements ContactRepositoryInterface
{
	protected $contact;

	public function __construct(Contact $contact)
	{
		$this->contact = $contact;
	}

	// ALL()
	public function all()
	{
		return $this->contact->all();
	}

	// FIND($ID)
	public function find($id)
	{
		return $this->contact->find($id);
	}

	// STORE($INPUT)
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Contact::$rules);

		if ($validation->passes())
		{
			$this->contact->create($input);
			$result['success'] = true;
			$result['message'] = 'The contact was Succeessfully created';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error creating this contact';
			return $result;
		}
		
	}

	// UPDATE($ID, $INPUT)
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Contact::$rules);

		if ($validation->passes())
		{
			
			
			$this->contact->find($id)->update($input);
			$result['success'] = true;
			$result['message'] = 'Contact scuccessfully updated!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this contact';
			return $result;
		}
		
	}

	//DESTROY($ID) -> & ALL CUSTOMERS ORDERS
	public function destroy($id)
	{
		$result = array();
		if($this->contact->find($id)->delete())
		{

			$result['success'] = true;
			$result['message'] = 'Contact was successfully Deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleting the Contact!!';
			return $result;
		}

			
	}

	public function listCompany()
	{
		return \DB::table('contacts')->lists('company', 'id');
	}
}