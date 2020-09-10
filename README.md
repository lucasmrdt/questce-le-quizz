# Questce - Quiz Flash Card

## Useful regexp

### Replace web link to iframe

```
<div class="source"(.|\n)*?<a href="(.*?)"(.|\n)*?</div>
<iframe src="$2" width="500" height="500" style="border:none;"></iframe>
```

### Close all details

```
details open=""
details
```
