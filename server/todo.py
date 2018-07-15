from flask import Blueprint, request, jsonify
from redisworks import Root


root = Root
root.todo_list = {"item1": "This is a nice day", "item2": "Python is awesome"}
todo_api = Blueprint("todo", "todo", url_prefix="/todos")


@todo_api.route("/", methods=["GET"])
def api_list():
    items = root.todo_list
    return jsonify(items)


@todo_api.route("/<item_id>", methods=["GET", "DELETE", "PUT"])
def api_item(item_id):
    if request.method == "GET":
        return get_item(item_id)
    elif request.method == "PUT":
        return put_item(item_id)
    else:
        delete_item(item_id)


def get_item(item_id):
    return root.todo_list[item_id]


def put_item(item_id):
    item = request.data
    root.todo_list[item_id] = item.decode("utf-8")
    return item, 201


def delete_item(item_id):
    root.todo_list.__delitem__(item_id)
