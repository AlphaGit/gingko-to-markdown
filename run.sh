# run with tree ID:
# example:
# run.sh 6101d4901a5d3006df00001a ./output
OUTPUT_DIR=${2:-./output}
TREE_ID=${1:-6101d4901a5d3006df00001d}

rm -rf $OUTPUT_DIR/*
source loadCredentials.sh
node gingko-to-markdown.js -t $TREE_ID -u $USERNAME -p $PASSWORD "$@" \
  --postProcessing=index-tags \
  --postProcessing=strip-tags \
  --postProcessing=gitbook-metafiles \
  --rootOutput $OUTPUT_DIR \
  --bookOutput $OUTPUT_DIR/book