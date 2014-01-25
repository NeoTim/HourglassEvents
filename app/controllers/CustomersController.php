<?php

use Cox\Storage\Customer\CustomerRepositoryInterface as Customer;

class CustomersController extends BaseController {

	
	protected $customer;

	public function __construct(Customer $customer)
	{
		$this->customer = $customer;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX

	public function index()
	{
		$customers = $this->customer->all();

		return View::make('customers.index', compact('customers'));
	}

	// CREATE CUSTOMER

	public function create()
	{
		return View::make('customers.create');
	}

	// STORE CUSTOMER

	public function store()
	{
		$result = $this->customer->store(Input::all());

		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('customers.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('customers.create')
				->withInput();
		}
	}

	// SHOW CUSTOMER

	public function show($id)
	{
		$customer = $this->customer->find($id);

		return View::make('customers.show', compact('customer'));
	}

	// EDIT CUSTOMER

	public function edit($id)
	{
		$customer = $this->customer->find($id);

		if (is_null($customer))
		{
			return Redirect::route('customers.index');
		}

		return View::make('customers.edit', compact('customer'));
	}

	// UPDATE CUSTOMER

	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->customer->update($id, $input);

		if ($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('customers.show', $id);
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('customers.edit', $id)
			->withInput();
		}
	}

	// DELETE CUSTOMER
	
	public function destroy($id)
	{
		$result = $this->customer->destroy($id);
		
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('customers.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('customers.index');	
		}
	}

}
