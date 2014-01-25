<?php

use Cox\Storage\Contact\ContactRepositoryInterface as Contact;

class ContactsController extends BaseController {

	
	protected $contact;

	public function __construct(Contact $contact)
	{
		$this->contact = $contact;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX

	public function index()
	{
		$contacts = $this->contact->all();

		return View::make('contacts.index', compact('contacts'));
	}

	// CREATE CUSTOMER

	public function create()
	{
		return View::make('contacts.create');
	}

	// STORE CUSTOMER

	public function store()
	{
		$result = $this->contact->store(Input::all());
		$contact = Input::get('customer_id');
		if ($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('customers.show', $contact);
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('customers.show', $contact)
				->withInput();
		}
	}

	// SHOW CUSTOMER

	public function show($id)
	{
		$contact = $this->contact->find($id);

		return View::make('contacts.show', compact('contact'));
	}

	// EDIT CUSTOMER

	public function edit($id)
	{
		$contact = $this->contact->find($id);

		if (is_null($contact))
		{
			return Redirect::route('contacts.index');
		}

		return View::make('contacts.edit', compact('contact'));
	}

	// UPDATE CUSTOMER

	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->contact->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('customers.show', $input['customer_id']);
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::rout('customers.show', $input['customer_id'])
				->withInput();
		}
		
		// FOR AJAX
		// $contact = $this->contact->find($id)->update($input);
		// Session::flash('success', 'Contact updated successfully');
		// return Response::json(array(
		// 		'first' => $input['first'],
		// 		'last' => $input['last'],
		// 		'title' => $input['title'],
		// 		'phone' => $input['phone'],
		// 		'email' => $input['email'],
		// 		'address' => $input['address'],
		// 		'address2' => $input['address2'],
		// 		'city' => $input['city'],
		// 		'state' => $input['state'],
		// 		'zip' => $input['zip']
		// 		));
	
		
	}

	// DELETE CUSTOMER
	
	public function destroy($id)
	{
		$contact = $this->contact->find($id);
		$customer_id = $contact['customer_id'];
		$result = $this->contact->destroy($id);
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('customers.show', $customer_id);
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('customers.show', $customer_id);
		}
		// For AJAX
		// $contact = $this->contact->find($id);
		// $this->contact->destroy($id);
		
	}

}
