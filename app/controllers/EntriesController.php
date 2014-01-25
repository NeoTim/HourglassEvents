<?php

use Cox\Storage\Entry\EntryRepositoryInterface as Entry;
use Cox\Storage\Order\OrderRepositoryInterface as Order;
use Cox\Storage\product\ProductRepositoryInterface as Product;
use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;
use Cox\Storage\Pmethod\PmethodRepositoryInterface as Pmethod;

class EntriesController extends BaseController {

	/**
	 * Entry Repository
	 *
	 * @var Entry
	 */
	protected $entry;
	protected $order;

	public function __construct(Entry $entry, Order $order, Product $product, Ptype $ptype, Pmethod $pmethod)
	{
		$this->entry = $entry;
		$this->order = $order;
		$this->product = $product;
		$this->pmethod = $pmethod;
		$this->ptype = $ptype;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	
	public function index()
	{
		$entries = $this->entry->all();
		// $entries = DB::table('entries')->where('ptype_id', '=', 1)
		// 			         ->where('ptype_id', '=', 1)->get();
		return $entries->toJson();
		//return View::make('entries.index', compact('entries'));

		
	}

	
	public function create($id)
	{
		$ptypes = $this->ptype->all();
		$pmethods = $this->pmethod->all();
		$products = $this->product->listSku();
		$dmethods = DB::table('dmethods')->lists('name', 'id');
		$order = $this->order->find($id);
		return View::make('entries.create', compact('dmethods', 'ptypes', 'products', 'pmethods', 'order'));
	}

	
	public function store($id)
	{
		
		$input = array_except(Input::all(), array('newsku'));
		$result = $this->entry->store($input);
		$sku = Input::get('sku');
		

			if($result['success'])
			{	
				
				Session::flash('success', 'This Product ' . $sku . ' has been saved to Products');
				$this->seteventdata($result['entry']->id);
				return Redirect::route('orders.show', $id);
				

			}
			else 
			{
				Session::flash('error', $result['message']);
				return Redirect::back()->withInput();
			}
		
		
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$entry = $this->entry->find($id);

		return View::make('entries.show', compact('entry'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($order_id, $id)
	{
		$ptypes = $this->ptype->all();
		$pmethods = $this->pmethod->all();
		$products = $this->product->listSku();
		$entry = $this->entry->find($id);
		$order = $this->order->find($order_id);

		

		return View::make('entries.edit', compact('entry', 'products', 'ptypes', 'pmethods', 'order'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($order_id, $id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->entry->update($id, $input);

		if ($result['success'])
		{
			$entry = $this->entry->find($id);
			Event::fire(UpdateEntriesEventHandler::EVENT, array('entry' => $entry));
			Session::flash('success', $result['message']);
			return Redirect::route('orders.show', $order_id);
		}
		else
		{

			$entry = $this->entry->find($id);
			Session::flash('error', $result['message']);
			return Redirect::route('orders.show', $order_id)
				->withInput();
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($order_id, $entry_id)
	{
		$entry = $this->entry->find($entry_id);

		$result = $this->entry->destroy($entry_id);
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			Event::fire(DeleteEntriesEventHandler::EVENT, array($entry));	
			return Redirect::back();
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('orders.show', $order_id);
		}
	}


	public function seteventdata($id)
	{
		$entry = $this->entry->find($id);	
		Event::fire(StoreEntriesEventHandler::EVENT, array('entry' => $entry));
	}

}














