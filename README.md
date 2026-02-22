1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer => 

getElementById returns a single element with a unique id.

getElementsByClassName returns a HTML collection (array-like object) of elements with a specific className, this is live  meaning this collection updates automatically.

querySelector returns the first element that matches a CSS selector and it is flexible meaning we can use id, class, attribute, nested element.

querySelectorAll returns all matching elements as a NodeList and it is not live : does not update automatically.





2. How do you create and insert a new element into the DOM?

Answer => 
	
	<div class=“parent”></div>
	const newDiv = document.createElement(‘div’);
	parent.appendChild(newDiv)





3. What is Event Bubbling? And how does it work?

Answer => 

when we click something , an event happens and it does not stop there, it bubbles up to its parent => its parent => its parent … => document.




4. What is Event Delegation in JavaScript? Why is it useful?

Answer =>
	
Event delegation in javascript occurs when we attach one event listener to a parent element instead of adding many listeners to many child elements. 
Because of event bubbling , when a child is clicked, the event travels up to the parent, and the parent can detect which child was clicked.

It is useful because ==>
Fewer listeners results better performance
Cleaner code
Easier to manage




5. What is the difference between preventDefault() and stopPropagation() methods?

Answer =>
	
preventDefault() stops what the browser would normally do after the event but it does not stop the event from bubbling.

stopPropagation() stops the event from moving up to parent elements but it does not stop browser default behavior.

So preventDefault() → controls browser behavior ;
     stopPropagation() → controls event flow;
