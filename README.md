![image](https://github.com/JSThreads/jvd/assets/73474137/cb25b798-ec43-46a7-8208-17ed2744bca1)

## How it works

Jvd is a virtual DOM that has been redesigned to be the most optimal as possible and to rerender as few things as possible with dynamic updates that make changes in the DOM directly without passing threw the virtual DOM. It's possible with the help of `Slice`es that are sub-values in `State`s that can be subscribed dynamicaly as well as unsubscribed, so it's fast and don't pass by the virtual DOM for the smaller changes, and even for arrays or object with states native functions integration the dom is updatable easier and faster.