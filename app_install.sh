#! /usr/bin/env bash

echo Please provide the following details on your lab environment.
echo
echo "What is the address of your Mantl Control Server?  "
echo "eg: control.mantl.internet.com"
read control_address
echo
echo "What is the username for your Mantl account?  "
read mantl_user
echo
echo "What is the password for your Mantl account?  "
read -s mantl_password
echo
echo "What is the Lab Application Domain?  "
read mantl_domain
echo
echo "We need some details on your Spark and Tropo Account."
echo
echo "What is your Spark bot token?"
read -s spark_token
echo
#echo "What is your Spark bot email?"
#read bot_email
#echo
echo "What folder name do you want to use?"
read folder_name
echo
echo "What deployment name do you want to use?"
read deployment_name
echo
#echo "What is your Tropo sms_emergency_text script token (TOKEN_TROPO_SMSEMER_TXT)?"
#read -s token_tropo_smsemer_txt
#echo
#echo "What is your Tropo call_spark_call script token (TOKEN_TROPO_CALLSPARK_CALL)?"
#read -s token_tropo_callspark_call
#echo
#echo "What is your Tropo emergency_conference_call script token (TOKEN_TROPO_EMERCONF_CALL)?"
#read -s token_tropo_emerconf_call
#echo
#echo "What is your Tropo emergency_conference_text script token (TOKEN_TROPO_EMERCONF_TXT)?"
#read -s token_tropo_emerconf_txt
#echo


cp sample-spark-trak.json deploy-sparktrak2.json
#sed -i "" -e "s/DOCKERUSER/$docker_username/g" $docker_username-demoapp.json
sed -i "" -e "s/ENV_TOKEN_SPARK_BOT/$spark_token/g" deploy-spark-trak.json
#sed -i "" -e "s/ENV_TOKEN_TROPO_SMSEMER_TXT/$token_tropo_smsemer_txt/g" deploy-spark-trak.json
#sed -i "" -e "s/ENV_TOKEN_TROPO_CALLSPARK_CALL/$token_tropo_callspark_call/g" deploy-spark-trak.json
#sed -i "" -e "s/ENV_TOKEN_TROPO_EMERCONF_CALL/$token_tropo_emerconf_call/g" deploy-spark-trak.json
#sed -i "" -e "s/ENV_TOKEN_TROPO_EMERCONF_TXT/$token_tropo_emerconf_txt/g" deploy-spark-trak.json
sed -i "" -e "s/ENV_MANTL_CONTROL/$control_address/g" deploy-spark-trak.json
sed -i "" -e "s/ENV_DEPLOYMENT_NAME/$deployment_name/g" deploy-spark-trak.json
sed -i "" -e "s/ENV_FOLDER_NAME/$folder_name/g" deploy-spark-trak.json
sed -i "" -e "s/ENV_APP_DOMAIN/$mantl_domain/g" deploy-spark-trak.json
#sed -i "" -e "s/ENV_BOT_EMAIL/$bot_email/g" deploy-spark-trak.json

echo " "
echo "***************************************************"
echo "Installing the sparktrak2bot"
curl -k -X POST -u $mantl_user:$mantl_password https://$control_address:8080/v2/apps \
-H "Content-type: application/json" \
-d @deploy-sparktrak2.json \
| python -m json.tool

echo "***************************************************"
echo

echo Installed

echo
echo "You can also watch the progress from the GUI at: "
echo
echo "https://$control_address/marathon"
echo