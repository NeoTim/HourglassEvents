<?php

Event::listen(UpdateEntriesEventHandler::EVENT, "UpdateEntriesEventHandler");
Event::listen(StoreEntriesEventHandler::EVENT, "StoreEntriesEventHandler");
Event::listen(DeleteEntriesEventHandler::EVENT, "DeleteEntriesEventHandler");

Event::listen(StoreOrdersEventHandler::EVENT, "StoreOrdersEventHandler");
Event::listen(DeleteOrdersEventHandler::EVENT, "DeleteOrdersEventHandler");
