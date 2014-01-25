<?php

namespace Cox\Storage\Customer;
use Cox\Storage\Activity\ActivityRepositoryInterface as Activity;
use Customer;

class EloquentCustomerRepository implements CustomerRepositoryInterface
{
	protected $customer;
	protected $activity;

	public function __construct(Customer $customer, Activity $activity)
	{
		$this->customer = $customer;
		$this->activity = $activity;
	}

	// ALL()
	public function all()
	{
		return $this->customer->all();
	}

	// FIND($ID)
	public function find($id)
	{
		return $this->customer->find($id);
	}

	// STORE($INPUT)
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Customer::$rules);

		if ($validation->passes())
		{
			$this->customer->create($input);
			$this->activity->store($input['company'], 'New Customer', $input['company'] . ' Was just Created and stored', 'customer', 'store');
			$result['success'] = true;
			$result['message'] = 'The customer was Succeessfully created';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error creating this customer';
			return $result;
		}
		
	}

	// UPDATE($ID, $INPUT)
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Customer::$rules);

		if ($validation->passes())
		{
			$this->customer->find($id)->update($input);
			$customer = $this->customer->find($id);
			$this->activity->store($customer['company'] , 'Customer updated', $customer['company'] . ' Was just updated', 'customer', 'update');
			$result['success'] = true;
			$result['message'] = 'Customer scuccessfully updated!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this customer';
			return $result;
		}
		
	}

	//DESTROY($ID) -> & ALL CUSTOMERS ORDERS
	public function destroy($id)
	{
		$result = array();
		$customer = $this->customer->find($id);
		if($customer->orders()->count())
		{
			$result['success'] = false;
			$result['message'] = 'Please delete all orders from this Customer';
			return $result;
		}
		

		if(!$customer->orders()->count())
		{
			$this->activity->store($customer['company'] , 'Customer Deleted', $customer['company'] . ' Was just Deleted', 'customer', 'delete');	
			$customer->delete();
			$result['success'] = true;
			$result['message'] = 'Customer was successfully Deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleting the Customer!!';
			return $result;
		}

			
	}

	public function listCompany()
	{
		return \DB::table('customers')->lists('company', 'id');
	}
}