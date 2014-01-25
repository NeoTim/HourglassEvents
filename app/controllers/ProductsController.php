<?php

use Cox\Storage\Product\ProductRepositoryInterface as Product;

class ProductsController extends BaseController {

	/**
	 * Product Repository
	 *
	 * @var Product
	 */
	protected $product;

	public function __construct(Product $product)
	{
		$this->product = $product;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$products = $this->product->all();

		return View::make('products.index', compact('products'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('products.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$result = $this->product->store(Input::all());

		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('products.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('products.create')
				->withInput();
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
		$product = $this->product->find($id);

		return View::make('products.show', compact('product'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$product = $this->product->find($id);

		if (is_null($product))
		{
			return Redirect::route('products.index');
		}

		return View::make('products.edit', compact('product'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->product->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('products.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('products.edit', $id)
				->withInput();
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$result = $this->product->destroy($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('products.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('products.show', $id);
		}
	}

}
