from uploader import uploadVideo
import json
import random

with open('public/info.json') as f:
    info = json.load(f)

title = info["title"]
tags = info["tags"]
session_id = info["tiktoksessionid"]

file = './artifact/video.mp4'

uploadVideo(session_id, file, title, tags)
