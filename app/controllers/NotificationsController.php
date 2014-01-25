<?php

use Cox\Storage\Notification\NotificationRepositoryInterface as Notification;

class NotificationsController extends BaseController {

	/**
	 * Notification Repository
	 *
	 * @var Notification
	 */
	protected $notification;

	public function __construct(Notification $notification)
	{
		$this->notification = $notification;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$notifications = $this->notification->all();

		return View::make('notifications.index', compact('notifications'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('notifications.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$notify = $this->notification->store(Input::all());

		if($notify['success'])
		{

			return Response::json(array('id' => $notify['id'] ,'title' => $notify['title'], 'subject' => $notify['subject'], 'body' => $notify['body'], 'color' => $notify['color'], 'label' => $notify['label']));
			//return $notify;

		}else{

			return $notify;

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
		return $this->notification->all();
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$notification = $this->notification->find($id);

		if (is_null($notification))
		{
			return Redirect::route('notifications.index');
		}

		return View::make('notifications.edit', compact('notification'));
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
		
		$result = $this->notify->update($input);
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('notifications.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('notifications.index')
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
		$this->notification->find($id)->delete();

		return Redirect::route('notifications.index');
	}

}
