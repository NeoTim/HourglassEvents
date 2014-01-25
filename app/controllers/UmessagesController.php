<?php

use Cox\Storage\Umessage\UmessageRepositoryInterface as Umessage;


class UmessagesController extends BaseController {

	protected $umessage;

	public function __construct(Umessage $umessage)
	{
		$this->umessage = $umessage;
	}


	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$userId = Sentry::getUser()->id;
		$inboxes = $this->umessage->findInbox($userId);
		$sents = $this->umessage->findSent($userId);
		$drafts = $this->umessage->findDraft($userId);
		$trashes = $this->umessage->findTrash($userId);
		//$umessages = $this->umessage->all();
		
        return View::make('umessages.index', compact('inboxes', 'sents', 'drafts', 'trashes'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        return View::make('umessages.compose');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$data = Input::all();

	    Mail::send('emails.test',$data, function($message)
	    {
	        $message->to('joel.design@icloud.com')->subject('Welcome!');
	    });
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        return View::make('umessages.show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        return View::make('umessages.edit');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	public function inbox()
	{
		$userId = Sentry::getUser()->id;
		$umessages = $this->umessage->findInbox($userId);
		//$umessages = $this->umessage->all();
		
        return View::make('umessages.inbox', compact('umessages'));
	}

	public function sent()
	{
		$userId = Sentry::getUser()->id;
		$umessages = $this->umessage->findSent($userId);

        return View::make('umessages.inbox', compact('umessages'));
	}

	public function draft()
	{
		$userId = Sentry::getUser()->id;
		$umessages = $this->umessage->findDraft($userId);

        return View::make('umessages.inbox', compact('umessages'));
	}

	public function trash()
	{
		$userId = Sentry::getUser()->id;
		$umessages = $this->umessage->findTrash($userId);

        return View::make('umessages.inbox', compact('umessages'));
	}

	
}
