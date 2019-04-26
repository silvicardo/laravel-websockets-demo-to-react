<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Message;
use App\User;

class MessagesController extends Controller
{

  public function fetchMessages()
  {

      //We have only ONE open conversation
      //so we get all messages
      return response(
        ['messages' => Message::with('user')->get()]
      );
  }

  public function sendMessage(Request $request)
  {

      //Retrieve the current user from the request
      $currentUser = $request->user();

      //then create and store the new message
      $message = $currentUser->messages()->create([
          'message' => $request->message
      ]);

      //make it visible to everyone
      broadcast(new MessageSent($currentUser, $message))->toOthers();
      
      return ['status' => 'Message Sent!'];
  }

}
