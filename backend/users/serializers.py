from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=False, 
        allow_blank=True, 
        allow_null=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="This email is already in use."
            )
        ],
        error_messages={
            'invalid': 'Please provide a valid email address.',
            'blank': 'Email cannot be blank.'
        }
    )
    
    mobile = serializers.CharField(
        required=False, 
        allow_blank=True, 
        allow_null=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="This mobile number is already in use."
            )
        ],
        error_messages={
            'blank': 'Mobile number cannot be blank.'
        }
    )
    
    password = serializers.CharField(
        write_only=True,
    )



    class Meta:
        model = User
        fields = ['id','username', 'email', 'mobile', 'password', 'role','first_name','last_name']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

