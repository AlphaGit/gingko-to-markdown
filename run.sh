# run with tree ID:
# example:
# run.sh 6101d4901a5d3006df00001a ./output
OUTPUT_DIR="$2"
TREE_ID="$1"

rm -rf $OUTPUT_DIR/*
source loadCredentials.sh
node gingko-to-markdown.js $TREE_ID $OUTPUT_DIR
