<?php
error_reporting(1);

class WmsftpController extends AppController
{
    
    var $name = "Wmsftp";
	
    var $components = array('Session','Common','Auth','Paginator');
    
    var $helpers = array('Html','Form','Common','Session','Paginator');
	
	public function beforeFilter()
    {
            parent::beforeFilter();
            $this->layout = false;
            $this->Auth->Allow(array('ftp','goh'));
    }
	
	public function goh() 
    {
	 
		$ftp_server = "ftp.healthcareorders.com";
		$ftp_username ="healtyrvvx";
		$ftp_userpass ="1bY5ld22pc8d44c4tlCO";
		echo $ftpsfile  = file_get_contents("ftp://healtyrvvx:1bY5ld22pc8d44c4tlCO@ftp.healthcareorders.com/Ready/795-RDSExport.csv");
		//echo $ftpsfile  = file_get_contents("ftp://healtyrvvx:1bY5ld22pc8d44c4tlCO@ftp.healthcareorders.com/Pulled/2021/12/08/795-RDSExport.csv");
		exit;
	}
	
	public function ftp() 
    {
	
 		$strServer 				= 'ftp.healthcareorders.com';
		$strServerPort 			= '21';
		$strServerUsername 		= 'healtyrvvx';
		$strServerPassword 		= '1bY5ld22pc8d44c4tlCO';
		$folderName				= 'Ready';//'Pulled/2023/04/02';//'Ready';
		
		$files = array();
		
		try
		{ 
		    $ftp  = ftp_connect($strServer);
			$sftp = ftp_login($ftp, $strServerUsername, $strServerPassword);
			ftp_pasv($ftp, TRUE);
			$dirHandle = ftp_nlist($ftp,$folderName);
			// Properly scan through the directory for files, ignoring directory indexes (. & ..)
			
			foreach($dirHandle as $key=>$file) { 
			{
				if ($file != $folderName.'/.' && $file != $folderName.'/..')
				{
				    $fileindex = explode('/',$file);
					$file = $fileindex[1];
					$files[] = $file;
					
					$h = fopen('php://temp', 'r+');
 
 					ftp_fget($ftp, $h, $folderName.'/'.$file, FTP_BINARY, 0);
 					$fstats = fstat($h);
					fseek($h, 0);
					$strData = fread($h, $fstats['size']); 
				
					fclose($h);	
						
					$uploadUrl = WWW_ROOT .'wms_orders/';
 					file_put_contents($uploadUrl . $file , $strData );
					
					$folderpulled = 'Pulled/'.date('Y/m/d');
					$this->make_directory($ftp,$folderpulled);
					ftp_put($ftp,$folderpulled."/".$file,$uploadUrl . $file, FTP_BINARY );
				}
			}
			}
		}
		catch ( Exception $e )
		{
			throw new Exception('Unable to retrieve file list from server: ' . $e->getMessage());
		}
		echo json_encode( $files); 
		exit;
		 
	}
	
	public function strewthbusiness() 
    {
	 
		$ftp_server = "sftp.redarrow.co.uk";
		$ftp_username ="thefreightcorp";
		$ftp_userpass ="h@ppyPuma88";
		echo $ftpsfile  = file_get_contents("ftp://{$ftp_username}:{$ftp_userpass}@{$ftp_server}/neworders");
		//echo $ftpsfile  = file_get_contents("ftp://healtyrvvx:1bY5ld22pc8d44c4tlCO@ftp.healthcareorders.com/Pulled/2021/12/08/795-RDSExport.csv");
		exit;
	}
	public function strewthftp() 
    {
	
 		$strServer 				= 'sftp.redarrow.co.uk';
		$strServerPort 			= '22';
		$strServerUsername 		= 'thefreightcorp';
		$strServerPassword 		= 'h@ppyPuma88';
		$folderName				= 'neworders';
		
		$files = array();
		
		try
		{ 
		    $ftp  = ftp_connect($strServer);
			$sftp = ftp_login($ftp, $strServerUsername, $strServerPassword);
			var_dump($sftp);
			ftp_pasv($ftp, TRUE);
			$dirHandle = ftp_nlist($ftp,$folderName);
			// Properly scan through the directory for files, ignoring directory indexes (. & ..)
			
			foreach($dirHandle as $key=>$file) { 
			{
				if ($file != $folderName.'/.' && $file != $folderName.'/..')
				{
				    $fileindex = explode('/',$file);
					$file = $fileindex[1];
					$files[] = $file;
					
					$h = fopen('php://temp', 'r+');
 
 					ftp_fget($ftp, $h, $folderName.'/'.$file, FTP_BINARY, 0);
 					$fstats = fstat($h);
					fseek($h, 0);
					$strData = fread($h, $fstats['size']); 
				
					fclose($h);	pr($strData);
						
					/*$uploadUrl = WWW_ROOT .'wms_orders/';
 					file_put_contents($uploadUrl . $file , $strData );
					
					$folderpulled = 'Pulled/'.date('Y/m/d');
					$this->make_directory($ftp,$folderpulled);
					ftp_put($ftp,$folderpulled."/".$file,$uploadUrl . $file, FTP_BINARY );*/
				}
			}
			}
		}
		catch ( Exception $e )
		{
			throw new Exception('Unable to retrieve file list from server: ' . $e->getMessage());
		}
		echo json_encode( $files); 
		exit;
		 
	}
	
	public function ftp_is_dir($ftp_stream, $dir)
	{
	   // get current directory
	   $original_directory = ftp_pwd($ftp_stream);
	   // test if you can change directory to $dir
	   // suppress errors in case $dir is not a file or not a directory
	   if ( @ftp_chdir( $ftp_stream, $dir ) ) {
		   // If it is a directory, then change the directory back to the original directory
		   ftp_chdir( $ftp_stream, $original_directory );
		   return true;
	   } else {
		   return false;
	   }
	}
	
	public function make_directory($ftp_stream, $dir)
	{
		// if directory already exists or can be immediately created return true
		if ($this->ftp_is_dir($ftp_stream, $dir) || @ftp_mkdir($ftp_stream, $dir)) return true;
		// otherwise recursively try to make the directory
		if (!$this->make_directory($ftp_stream, dirname($dir))) return false;
		// final step to create the directory
		return ftp_mkdir($ftp_stream, $dir);
	}	
}

?>

