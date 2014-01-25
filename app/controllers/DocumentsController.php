<?php

use Cox\Storage\Document\DocumentRepositoryInterface as Document;

class DocumentsController extends BaseController {

	/**
	 * Document Repository
	 *
	 * @var Document
	 */
	protected $document;

	public function __construct(Document $document)
	{
		$this->document = $document;
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
		$documents = $this->document->all();

		return View::make('documents.index', compact('documents'));
		
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('documents.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$this->document->store();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$document = $this->document->findOrFail($id);

		return View::make('documents.show', compact('document'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$document = $this->document->find($id);

		if (is_null($document))
		{
			return Redirect::route('documents.index');
		}

		return View::make('documents.edit', compact('document'));
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
		$validation = Validator::make($input, Document::$rules);

		if ($validation->passes())
		{
			$document = $this->document->find($id);
			$document->update($input);

			return Redirect::route('documents.show', $id);
		}

		return Redirect::route('documents.edit', $id)
			->withInput()
			->withErrors($validation)
			->with('message', 'There were validation errors.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$this->document->find($id)->delete();

		return Redirect::route('documents.index');
	}

}
