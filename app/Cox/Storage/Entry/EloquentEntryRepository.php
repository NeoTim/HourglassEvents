<?php

namespace Cox\Storage\Entry;

use Cox\Storage\Product\ProductRepositoryInterface as Product;
use Cox\Storage\Activity\ActivityRepositoryInterface as Activity;
use Cox\Storage\Order\OrderRepositoryInterface as Order;
use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;
use Cox\Storage\Pmethod\PmethodRepositoryInterface as Pmethod;
use Entry;

class EloquentEntryRepository implements EntryRepositoryInterface
{
	protected $entry;
	protected $product;
	protected $order;
	protected $activity;
	protected $ptype;
	protected $pmethod;

	public function __construct(Entry $entry, Product $product, Order $order, Activity $activity, Ptype $ptype, Pmethod $pmethod)
	{
		$this->entry = $entry;
		$this->product = $product;
		$this->order = $order;
		$this->activity = $activity;
		$this->ptype = $ptype;
		$this->pmethod = $pmethod;
	}

	public function all()
	{
		
		return $this->entry->all();
	}

	public function find($id)
	{
		return $this->entry->find($id);
	}

	// FIND BY $ORDER_ID
	public function findByOrder($order_id)
	{
		return $this->entry->where('order_id', '=', $order_id);
	}

	// FIND BY TODAY
	public function findByToday()
	{
		return $this->entry->where('created_at', '=', NOW());
	}

	public function store($input)
	{
		$result = array();
		$order = $this->order->find($input['order_id']);
		if(\Input::get('ptype_id'))
		{
			$ptype = $this->ptype->find($input['ptype_id']);
		}else{
			$result['success'] = false;
			$result['message'] = "Please choose a production type";
			return $result;
		}
		if(\Input::get('pmethod_id'))
		{
			$pmethod = $this->pmethod->find($input['pmethod_id']);
		}
		if(\Input::get('container1'))
		{
			$gal1 = \Input::get('container1') * \Input::get('qty1');
			$input['gal1'] = $gal1;
		}
		if(\Input::get('container2'))
		{
			$gal2 = \Input::get('container2') * \Input::get('qty2');
			$input['gal2'] = $gal2;
		}
		if(\Input::get('container3'))
		{
			$gal3 = \Input::get('container3') * \Input::get('qty3');
			$input['gal3'] = $gal3;
		}	
		if(\Input::get('newsku'))
		{
			$product = new \Product;
			$product->sku = \Input::get('newsku');

			if($product->save())
			{	$input['sku'] = $product->sku;
				$input['product_id'] = $product->id;
				
				$result['entry'] = $this->entry->create($input);
				$result['success'] = true;
				$result['message'] = "This product was created successfully";
				$result['sku'] = $product->sku;
				$result['product_id'] = $product->id;

				$this->activity->store($product->sku, 'New Product', 'Product SKU - ' . $product->sku . ' Was just Created', 'product', 'store');
				$this->activity->store($product->sku, 'Added to Order # ' . $order['number'], $product->sku . ' Was just added to ' . $order['title'], 'entry', 'store');
				if(\Input::get('ptype_id'))
				if($input['ptype_id'] == 1 OR $input['ptype_id'] == 2)
				{
					$this->activity->store($product->sku, 'Added to production', $product->sku . ' Was just added to ' . $pmethod['name'], 'production', 'store');
				}
				return $result;
				
			}
		}
		elseif (\Input::get('product_id'))
		{
			
			$product = $this->product->find($input['product_id']);
			$input['sku'] = $product->sku;
			$result['entry'] = $this->entry->create($input);
			$result['success'] = true;
			$result['message'] = "You Product has been added to this order";
			$result['product_id'] = \Input::get('product_id');
			$this->activity->store($product->sku, 'Added to Order # ' . $order['number'], $product->sku . ' Was just added to ' . $order['title'], 'entry', 'store');
			if($input['ptype_id'] == 1 OR $input['ptype_id'] == 2)
				{
					$this->activity->store($product->sku, 'Added to production', $product->sku . ' Was just added to ' . $pmethod['name'], 'production', 'store');
				}
			return $result;
		}
	}

	public function update($id, $input)
	{
		$entry = $this->entry->find($id);
		$result = array();
		$product = $this->product->find($input['product_id']);
		$input['sku'] = $product->sku;
		$order = $this->order->find($entry['order_id']);

			if($entry->update($input))
			{
				if(\Input::get('container1'))
			{
				$gal1 = \Input::get('container1') * \Input::get('qty1');
				$input['gal1'] = $gal1;
			}
			if(\Input::get('container2'))
			{
				$gal2 = \Input::get('container2') * \Input::get('qty2');
				$input['gal2'] = $gal2;
			}
			if(\Input::get('container3'))
			{
				$gal3 = \Input::get('container3') * \Input::get('qty3');
				$input['gal3'] = $gal3;
			}	
			if(\Input::get('ready_date'))
			{
				$end_day_old = \Input::get('ready_date');
				$end_day = date("Y-m-d H:i:s", strtotime($end_day_old));
				$input['ready_date'] = $end_day;
			}
			else
			{
				$input['ready_date'] = null;
			}
			$result['success'] = true;
			$result['message'] = $entry['sku'] . " Was updated successfully";
			$this->activity->store($input['sku'], 'Product from Order # ' . $order['number'] . ' updated', $input['sku'] . ' from ' . $order['title'] . ' was just updated', 'entry', 'update');
			return $result;
		}
		else
		{
			$result['success'] = fasle;
			$result['message'] = "There was an error updating " . $entry['sku'] ;
			return $result;
		}
	}

	public function destroy($id)
	{
		$entry = $this->entry->find($id);
		$order = $this->order->find($entry['order_id']);
		$pmethod = $this->pmethod->find($entry['pmethod_id']);
		if($entry->delete())
		{
			$this->activity->store($entry['sku'], 'Product from Order #' . $order['number'] . ' Deleted', $entry['sku'] . ' from ' . $order['title'] . ' was just Deleted', 'entry', 'delete');
			if($entry['ptype_id'] == 1 OR $entry['ptype_id'] == 2)
			{
				$this->activity->store($entry['sku'], 'Product removed from production', $entry['sku'] . ' Was removed from ' . $pmethod['name'], 'production', 'delete');
			}
			$result['success'] = true;
			$result['message'] = $entry['sku'] . " Was deleted successfully";
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = "There was an error deleteing " . $entry['sku'] ;
			return $result;
		}
	}
}