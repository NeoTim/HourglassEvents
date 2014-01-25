<?php

namespace Cox\Storage\Product;

use Product;

class EloquentProductRepository implements ProductRepositoryInterface
{
	protected $product;

	public function __construct(Product $product)
	{
		$this->product = $product;
	}

	public function all()
	{
		return $this->product->all();
	}

	public function find($id)
	{
		return $this->product->find($id);
	}

	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Product::$rules);

		if ($validation->passes())
		{
			$this->product->create($input);
			$result['success'] = true;
			$result['message'] = 'Your product was successfully created !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error creating this product!!';
			return $result;	
		}
	}

	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Product::$rules);

		if ($validation->passes())
		{
			$this->product->find($id)->update($input);
			$result['success'] = true;
			$result['message'] = 'Your product was successfully updated !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this product!!';
			return $result;		
		}
	}

	public function destroy($id)
	{
		if($this->product->find($id)->delete())
		{
			$result['success'] = true;
			$result['message'] = 'Your Product was successfully deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleteing this Product!!';
			return $result;
		}
	}

	public function listSku()
	{
		return \DB::table('products')->lists('sku', 'id');
	}
}