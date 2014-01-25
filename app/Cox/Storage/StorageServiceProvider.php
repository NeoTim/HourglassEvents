<?php

namespace Cox\Storage;

use Illuminate\Support\ServiceProvider;

class StorageServiceProvider extends ServiceProvider
{
	public function register()
	{
		$this->app->bind(
            'Cox\Storage\Order\OrderRepositoryInterface',
            'Cox\Storage\Order\EloquentOrderRepository'
        );

        $this->app->bind(
            'Cox\Storage\Entry\EntryRepositoryInterface',
            'Cox\Storage\Entry\EloquentEntryRepository'
        );

        $this->app->bind(
            'Cox\Storage\Customer\CustomerRepositoryInterface',
            'Cox\Storage\Customer\EloquentCustomerRepository'
        );

        $this->app->bind(
            'Cox\Storage\Product\ProductRepositoryInterface',
            'Cox\Storage\Product\EloquentProductRepository'
        );

        $this->app->bind(
            'Cox\Storage\Dmethod\DmethodRepositoryInterface',
            'Cox\Storage\Dmethod\EloquentDmethodRepository'
        );

        $this->app->bind(
            'Cox\Storage\Dtype\DtypeRepositoryInterface',
            'Cox\Storage\Dtype\EloquentDtypeRepository'
        );

        $this->app->bind(
            'Cox\Storage\Ptype\PtypeRepositoryInterface',
            'Cox\Storage\Ptype\EloquentPtypeRepository'
        );

        $this->app->bind(
            'Cox\Storage\Pmethod\PmethodRepositoryInterface',
            'Cox\Storage\Pmethod\EloquentPmethodRepository'
        );

        $this->app->bind(
            'Cox\Storage\Product\ProductRepositoryInterface',
            'Cox\Storage\Product\EloquentProductRepository'
        );
        
        $this->app->bind(
            'Cox\Storage\Document\DocumentRepositoryInterface',
            'Cox\Storage\Document\EloquentDocumentRepository'
        );
        
        $this->app->bind(
            'Cox\Storage\Contact\ContactRepositoryInterface',
            'Cox\Storage\Contact\EloquentContactRepository'
        );

        $this->app->bind(
            'Cox\Storage\Activity\ActivityRepositoryInterface',
            'Cox\Storage\Activity\EloquentActivityRepository'
        );
        $this->app->bind(
            'Cox\Storage\Umessage\UmessageRepositoryInterface',
            'Cox\Storage\Umessage\EloquentUmessageRepository'
        );
        $this->app->bind(
            'Cox\Storage\Notification\NotificationRepositoryInterface',
            'Cox\Storage\Notification\EloquentNotificationRepository'
        );

	}	
}