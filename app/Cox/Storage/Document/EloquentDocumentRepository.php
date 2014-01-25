<?php

namespace Cox\Storage\Document;

use Document;

class EloquentDocumentRepository implements DocumentRepositoryInterface
{
	protected $document;

	public function __construct(Document $document)
	{
		$this->document = $document;
	}

	public function all()
	{
		return $this->document->all();
	}

	public function find($id)
	{
		return $this->document->find($id);
	}

	// STORE Production type
	public function store()
	{
		$result = array();
		
		$file = \Input::file('file'); // your file upload input field in the form should be named 'file'
		$destinationPath = 'files/';
		$filename = $file->getClientOriginalName();
		$extension =$file->getClientOriginalExtension(); //if you need extension of the file
		$uploadSuccess = \Input::file('file')->move($destinationPath, $filename);
	
		if( $uploadSuccess ) 
		{
			$drop = new Document;
			$drop->file = $file;
			$drop->name = $filename;
			$drop->path = $destinationPath;
			$drop->save();

		}
		
	}

	// UPDATE Production type
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Document::$rules);

		if ($validation->passes())
		{
			$this->document->find($id)->update($input);
			$result['success'] = true;
			$result['message'] = 'Your Production type was successfully updated !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this production type!!';
			return $result;		
		}
	}

	public function destroy($id)
	{
		if($this->document->find($id)->delete())
		{
			$result['success'] = true;
			$result['message'] = 'Your Production type was successfully deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleteing this production type!!';
			return $result;
		}
	}
}