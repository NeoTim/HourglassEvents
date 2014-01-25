<?php

namespace Cox\Storage\Order;
use Cox\Storage\Activity\ActivityRepositoryInterface as Activity;
use Cox\Storage\Customer\CustomerRepositoryInterface as Customer;

use Order;

class EloquentOrderRepository implements OrderRepositoryInterface
{
	protected $order;
	protected $softDelete = true;
	public function __construct(Order $order, Activity $activity, Customer $customer)
	{
		$this->order = $order;
		$this->activity = $activity;
		$this->customer = $customer;
	}

	public function all()
	{
		return $this->order->with('dtype', 'dmethod')->get();
	}

	public function find($id)
	{

		return $this->order->find($id);
	}

	public function store($input)
	{


		$result = array();
		$validation = \Validator::make($input, \Order::$rules);

		if ($validation->passes())
		{
			if(\Input::get('company') OR \Input::get('newname'))
			{
				$customer = new \Customer;
				$customer->company = \Input::get('company');
				$customer->first = \Input::get('newname');
				$this->activity->store($customer->company, 'New Customer', $customer->company . ' Was created and stored', 'customer', 'store');

				if($customer->save())
				{
					
					if(\Input::get('start') == " ")
					{
						$input['start'] = " ";
					}
					$input['customer_id'] = $customer->id;
					$input['title'] = $customer->company . ' - ' . $input['number'];
					
					
					$result['order'] = $this->order->create($input);
					$result['success'] = true;
					$result['message'] = "Order was successfully created";

					$this->activity->store('Order - ' . $input['number'], 'New Order', 'Order - ' . $input['number'] . ' Was created and stored', 'order', 'store');

					return $result;
				}
			}
			elseif (\Input::get('customer_id')) 
			{
				
				if(\Input::get('start') == " ")
				{
					$input['start'] = " ";
				}
				$customer = $this->customer->find(\Input::get('customer_id'));

				$input['title'] = $customer->company . ' - ' . $input['number'];
				$result['order'] = $this->order->create($input);
				$result['success'] = true;
				$result['message'] = "Order was successfully created";

				
				$this->activity->store('Order - ' . $input['number'], 'New Order', 'Order - ' . $input['number'] . ' Was created and stored', 'order', 'store');
				return $result;
			}
			
		}
		else
		{
			$result['success'] = false;
			$result['message'] = "There was an error creating the order";
			return $result;
		}
	}

	public function update($id, $input)
	{

		$validation = \Validator::make($input, \Order::$rules);

		if ($validation->passes())
		{
			$order = $this->order->find($id);
			if(\Input::get('start') == "")
			{
				$input['start'] = " ";
			}
			$order->update($input);
			$this->activity->store('Order - ' . $order['number'], 'Update Order', $order['title'] . ' Was updated and stored', 'order', 'update');
			$result['success'] = true;
			$result['message'] = $order['title'] . ' was Successfully updated';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = "There was an error updating the order";
			return $result;
		}

		
		
	}

	public function destroy($id)
	{
		$result = array();
		$order = $this->order->find($id);
		$order->entries()->delete();
		if($order->delete())
		{
			$result['success'] = true;
			$result['message'] = 'Order was successfully deleted';
			$this->activity->store('Order - ' . $order['number'], 'Order Deleted', $order['title'] . ' was Deleted!!', 'order', 'delete');
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error deleting the entries within the order.';
			return $result;
		}

	}
	public function trash()
	{
		return $this->order->onlyTrashed()->get();
	}

	public function restoreOrder($id)
	{
		$result = array();
		$order = $this->order->withTrashed()->find($id);
		$order->restore();
		$order->entries()->restore();
		if($order->save())
		{
			$result['success'] 	= true;
			$result['message']	= 'order - ' . $order['number'] . ' Was Successfully restored!!';
		}else{
			$result['success'] 	= false;
			$result['message']	= 'There was an error restoring order - ' . $order['number'];
		}
		return $result;
	}

	public function remove($id)
	{
		$result = array();

		$order = $this->order->withTrashed()->find($id);
		
		if($order->entries()->withTrashed()->forceDelete())
		{
			$order->forceDelete();
			$result['success'] 	= true;
			$result['message']	= 'Order - ' . $order['number'] . ' Was Successfully Deleted!!';
		}else{
			$result['success'] 	= false;
			$result['message']	= 'There was an error Deleting order - ' . $order['number'];
		}
		return $result;
	}

	public function emptyTrash()
	{

	}

	

	
}